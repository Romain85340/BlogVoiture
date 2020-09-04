module.exports = {
    homePage: (req, res) => {
        let cars = 'SELECT c.id AS id, c.name AS modele, f.name AS constructeur, c.years AS annee, c.price AS prix, c.image AS image FROM car AS c JOIN facturies AS f ON c.facturyId = f.id ORDER BY c.price ASC;'
        
        db.query(cars, (err, result) => {
            console.log(result);
            if(err){
                res.send(err)
            } res.render("home", {cars: result})
        })
    }
}