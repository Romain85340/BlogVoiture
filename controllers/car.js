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
        let editPage = ["SELECT c.name AS modele, f.name AS constructeur, c.years AS annee, c.price AS prix, e.name AS carburant, c.image AS image FROM car AS c JOIN facturies AS f ON c.facturyId = f.id JOIN energies AS e ON c.energyId = e.id WHERE c.id = '" + id + "'", "SELECT * FROM facturies", "SELECT * FROM energies"]

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

    }
}