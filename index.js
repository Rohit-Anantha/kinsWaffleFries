/**
 * Author: Rohit Anantha
 * Version 1.0
 * Purpose: Are there Waffle Fries at Kinsolving Dining today?
 */
const { Console } = require('console');
const cool = require('cool-ascii-faces');
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/waffle', { test: waffles() }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))

waffles = () => {
  var request = require('sync-request');
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  var urlStart = "http://hf-food.austin.utexas.edu/foodpro/longmenu.aspx";
  var urlName = "?sName=I&";
  var locationNum = "locationNum=";
  var locationName = "&locationName=I&naFlag=1&WeeksMenus=This+Week%27s+Menus&dt";
  var dateURL = "date=";
  var AND_SYMBOL = "&";
  var PERCENT_TWO_F = "%2f";
  var mealString = "mealName=";
  var mealName = 'Dinner';

  var url = urlStart + urlName + locationNum + '03' + locationName + dateURL
    + mm + PERCENT_TWO_F + dd + PERCENT_TWO_F + yyyy + AND_SYMBOL + mealString + mealName;

  var http = httpGet(url)

  function httpGet(url) {
    var response = request(
      'GET',
      url
    );
    console.log("Status Code (function) : " + response.statusCode);
    return response.body;
  }

  var httpAsString = http.toString();

  var index = httpAsString.indexOf('Waffle Fries')
  if (index < 0) {
    return 'No'
  }
  else {
    return 'Yes'
  }
}
