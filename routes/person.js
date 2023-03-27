
var express = require('express');
var router = express.Router();

/* GET productos listing. */
router.get('/', function(req, res, next) {
    const personas = [{"BusinessEntityID":1,"PersonType":"EM","NameStyle":false,"FirstName":"Ken","MiddleName":"J","LastName":"Sánchez","EmailPromotion":0,"Demographics":"<IndividualSurvey xmlns=\"http:\/\/schemas.microsoft.com\/sqlserver\/2004\/07\/adventure-works\/IndividualSurvey\"><TotalPurchaseYTD>0<\/TotalPurchaseYTD><\/IndividualSurvey>","rowguid":"92C4279F-1207-48A3-8448-4636514EB7E2","ModifiedDate":"2009-01-07T00:00:00"}]
  
    res.render('person', { title: 'Personas', datos:personas });


});

module.exports = router;



