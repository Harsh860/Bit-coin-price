var express = require('express');
var router = express.Router();
var request = require('request');
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' , priceP : -1 ,priceS : -1 ,Amount :-1 , Coin: 'BTC',Profit : -1,TotalP : -1,TotalS : -1,err : -1});
});





router.post('/',function(req,res,next){

  const purchaseDate = req.body.Pdate + ' 00:00:00' ;
  const sellDate = req.body.Sdate + ' 00:00:00' ;
  const Coin = req.body.Coin;
  const Amount = req.body.amount;

  let dateP = new Date(purchaseDate.split(' ').join('T'));
  let dateS = new Date(sellDate.split(' ').join('T'));
  let TimeStampP = dateP.getTime()/1000;
  let TimeStampS = dateS.getTime()/1000;
  console.log(dateP.getTime());

  console.log(req.body);
      request('https://min-api.cryptocompare.com/data/pricehistorical?fsym='+Coin+'&tsyms=USD,EUR&ts='+TimeStampP+'&extraParams=your_app_name', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
         myObj = JSON.parse(body);

        console.log('priceP :',myObj[Coin]["USD"]); // Print the HTML for the Google homepage.

                  console.log(dateS.getTime());
                  request('https://min-api.cryptocompare.com/data/pricehistorical?fsym='+Coin+'&tsyms=USD,EUR&ts='+TimeStampS+'&extraParams=your_app_name', function (error, response, body) {
                    console.log('error:', error); // Print the error if one occurred
                    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                    myObj2 = JSON.parse(body);
                    const  priceP = myObj[Coin]["USD"];
                  const  priceS = myObj2[Coin]["USD"];
                  console.log('priceP :',priceP);
                  console.log('priceS :',priceS);
                    console.log('PriceS:', myObj2[Coin]["USD"]); // Print the HTML for the Google homepage.
                    const Profit = Amount*(priceS-priceP);
                    const TotalP = Amount*priceP;
                    const TotalS = Amount*priceS;

                    if(isNaN(Profit)){
                      res.render('index', { priceP: priceP, priceS : priceS,Amount : Amount ,Coin : Coin , Profit : Profit,TotalP : TotalP,TotalS : TotalS,err : 1});
                      res.end();
                      return
                    }else{
                    res.render('index', { priceP: priceP, priceS : priceS,Amount : Amount ,Coin : Coin , Profit : Profit,TotalP : TotalP,TotalS : TotalS,err : -1});
                    res.end();
                    return;
                  }
                  });

      });




})


module.exports = router;
