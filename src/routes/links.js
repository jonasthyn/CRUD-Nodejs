const expess = require('express');
const router = expess.Router();

const pool = require('../database');

// muestra el formulario en /add
router.get('/add', (req, res) => {
    res.render('links/add');
});

// recibe los datos del formulario
router.post('/add', async(req, res) => {
    const { titulo, url, descripcion } = req.body;
    const nuevoEnlace = {
        titulo,
        url,
        descripcion
    };
    await pool.query('INSERT INTO enlaces SET ?', [nuevoEnlace]);
    req.flash('exitoso', 'Enlace guardado satisfactoriamente');
    //console.log(nuevoEnlace);
    res.redirect('/links');
});

router.get('/', async(req, res) =>{
const enlaces = await pool.query('SELECT * FROM enlaces');
//console.log(enlaces);
res.render('links/lista', { enlaces });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM enlaces WHERE ID = ?', [id]);
    req.flash('exitoso', 'Enlace borrado satisfactoriamente');
    //console.log(req.params.id);
    res.redirect('/links');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const enlaces = await pool.query('SELECT * FROM enlaces WHERE ID = ?', [id]);
   // console.log(enlaces[0]);    
    res.render('links/edit', {enlace: enlaces[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, url, descripcion } = req.body;
    const nuevoEnlace = {
        titulo,
        url,
        descripcion
    };
    console.log(nuevoEnlace);    
    await pool.query('UPDATE enlaces SET ? WHERE id = ?', [nuevoEnlace, id]);
    req.flash('exitoso', 'Enlace Actualizado satisfactoriamente');
    res.redirect('/links');
});


module.exports = router;