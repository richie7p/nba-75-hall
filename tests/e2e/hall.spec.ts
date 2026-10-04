import { test, expect } from "@playwright/test";

test("server-rendered filters stay disabled until their event handlers are ready", async ({ page }) => {
 let release!: () => void;
 const scriptsReady = new Promise<void>(resolve => { release = resolve; });
 await page.route("**/*", async route => {
   if (route.request().resourceType() === "script") await scriptsReady;
   await route.continue();
 });
 try {
   await page.goto("/", { waitUntil: "commit" });
   await expect(page.getByRole("textbox", { name: "搜尋巨星" })).toBeDisabled();
   await expect(page.getByRole("button", { name: "PG 控球後衛", exact: true })).toBeDisabled();
   await expect(page.locator('a[href^="/player/"]')).toHaveCount(76);
 } finally { release(); }
 await page.getByRole("textbox", { name: "搜尋巨星" }).fill("Michael Jordan");
 await expect(page.locator('a[href^="/player/"]')).toHaveCount(1);
});
test("search, compound filters, detail, next/back, deep links and source labels", async ({page},info)=>{
 const errors:string[]=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("/");await expect(page.locator('a[href^="/player/"]')).toHaveCount(76);
 await expect(page.getByRole("complementary",{name:"來源與核對範圍"})).toBeVisible();
 await page.getByRole("textbox",{name:"搜尋巨星"}).fill("Michael Jordan");
 await expect(page.locator('a[href^="/player/"]')).toHaveCount(1);
 await page.locator('a[href="/player/michael-jordan"]').click();
 await expect(page.getByRole("heading",{level:1})).toContainText("喬丹");
 await page.getByRole("link",{name:"下一座展櫃"}).click();await expect(page).not.toHaveURL(/michael-jordan/);
 await page.goBack();await expect(page).toHaveURL(/michael-jordan/);
 await page.getByRole("link",{name:"回到殿堂"}).click();
 await page.getByRole("button",{name:"PG 控球後衛",exact:true}).click();
 await page.getByRole("button",{name:/當代 2010s/}).click();
 await expect(page).toHaveURL(/pos=PG/);await expect(page).toHaveURL(/era=modern/);
 await page.reload();await expect(page.locator('a[href^="/player/"]').first()).toBeVisible();
 await page.getByRole("textbox",{name:"搜尋巨星"}).fill("no such athlete xyz");
 await expect(page.getByText("這條走廊暫時空著")).toBeVisible();
 await page.getByRole("button",{name:"重設篩選"}).click();await expect(page.locator('a[href^="/player/"]')).toHaveCount(76);
 await page.goto("/player/kawhi-leonard");await expect(page.getByText(/末筆球隊（快照）多倫多暴龍/)).toBeVisible();
 await expect(page.locator('img[src^="/portraits/"]')).toHaveCount(0);
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:info.outputPath("detail.png"),fullPage:true});
 expect(errors).toEqual([]);
});
test("invalid URL filters and unknown players recover without a crash",async({page})=>{
 await page.goto("/?era=invalid&pos=invalid");await expect(page.locator('a[href^="/player/"]')).toHaveCount(76);
 await page.goto("/player/not-a-player");await expect(page.getByRole("link",{name:/回到殿堂/})).toBeVisible();
 await page.getByRole("link",{name:/回到殿堂/}).focus();await page.keyboard.press("Enter");
 await expect(page.getByRole("heading",{name:"榮耀殿堂"})).toBeVisible();
});
