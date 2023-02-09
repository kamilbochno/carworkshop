const puppeteer = require('puppeteer');
const fs = require('fs');


(async function() {
    const browser = await puppeteer.launch( { headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1966, height: 1024 })
    await page.goto('https://www.ebay.com/b/Cars-Trucks/6001/bn_1865117');

        const data = await page.evaluate(function () {
            const products = document.querySelectorAll('.js-product-list-item');
            const array = [];
            console.log(products)
    
            for (i=0; i<products.length; i++) {
                array.push({
                    title: products[i].querySelector('.lst_a').innerText,
                    src: products[i].querySelector('.lst_ic_h').getAttribute('data-src'),
                    price: products[i].querySelector('.lst_prc').innerText,
                })
            }
            return array;
    
            
        })
        console.log(data)
     //fs.writeFileSync('EOil.json', JSON.stringify(data));
     
})();