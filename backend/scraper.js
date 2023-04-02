const puppeteer = require("puppeteer");
const fs = require("fs");

(async function () {
  const browser = await puppeteer.launch({ headless: false }),
    page = await browser.newPage();
  await page.setViewport({ width: 1966, height: 1024 });
  await page.goto(
    "https://www.ebay.com/sch/i.html?_from=R40&_nkw=car%20parts&_sacat=6028&LH_TitleDesc=0&LH_ItemCondition=3&Brand%2520Type=Genuine%2520OEM&_dcat=33654&rt=nc&_udlo=30"
  );

  const data = await page.evaluate(() => {
    const products = document.querySelectorAll(".s-item__wrapper"),
      array = [];
    console.log(products);
    products.forEach((item) => {
      array.push({
        category: "Car parts",
        title: item.querySelector(".s-item__title").innerText,
        src: item.querySelector(".s-item__image-wrapper").innerHTML.slice(10, 76),
        price: item.querySelector(".s-item__price").innerText
      });
    });
    return array;
  });
  console.log(data);
  fs.writeFileSync("carParts.json", JSON.stringify(data));
})();
