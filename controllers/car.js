module.exports = {
    getSingleCar: (req, res) => {
        let id = req.params.id;
        let oneCar = "SELECT c.id AS id, c.name AS modele, f.name AS constructeur, c.years AS annee, c.price AS prix, c.image AS image FROM car AS c JOIN facturies AS f ON c.facturyId = f.id WHERE c.id = '" + id + "';"

        db.query( oneCar, (err, result) => {
            console.log(result);
            if (err) {
                return res.status(500).send(err);
            }
             res.render("oneCar", {
                 car: result[0]
            })
        })
    },
    getEditPage: (req, res) => {
        let id = req.params.id
        let editPage = ["SELECT c.id, c.name AS modele, f.name AS constructeur, c.years AS annee, c.price AS prix, e.name AS carburant, c.image AS image FROM car AS c JOIN facturies AS f ON c.facturyId = f.id JOIN energies AS e ON c.energyId = e.id WHERE c.id = '" + id + "'", "SELECT * FROM facturies", "SELECT * FROM energies"]

        db.query( editPage.join(';'), (err, result) => {
            console.log(result);
            if (err) {
                return res.status(500).send(err);
            }
            res.render("edit", {
                car: result[0][0],
                facturies: result[1],
                energies: result[2]
            
            })
        })

    },
    postEditPage: (req, res) => {
        let id = req.params.id

        let name = req.body.name
        let factory = req.body.factories
        let year = req.body.year
        let price = req.body.price
        let energy = req.body.energies

        let editPage = "UPDATE car JOIN facturies ON car.facturyId = facturies.id JOIN energies ON car.energyId = energies.id SET car.name = '" + name + "', car.facturyId = '" + factory + "',car.price = '" + price + "', car.years = '" + year + "', car.energyId = '" + energy + "' WHERE car.id = '" + id + "'"
        
        db.query( editPage, (err, result) => {
            console.log(result);
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect("/")
        })
        
    },
    getCreateCar: (req, res) => {
        let getCreatePage = ["SELECT * FROM facturies","SELECT * FROM energies"]

        db.query( getCreatePage.join(';'), (err, result) => {
            console.log(result);
            if (err) {
                return res.status(500).send(err);
            }
            res.render("create", {
                facturies: result[0],
                energies: result[1]
            
            })
        })
    },
    postCreateCar : (req, res) => {
        let name = req.body.name
        let factory = req.body.factories
        let year = req.body.year
        let price = req.body.price
        let image = req.body.image
        let energy = req.body.energies

        let createCar = "INSERT INTO car ( name, facturyId, years, price, image, energyId ) VALUES (?, ?, ?, ?, ?, ?)"

        db.query( createCar,[name, factory, year, price, image, energy], (err, result) => {
            console.log(result);
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect("/")
        })
    },
}