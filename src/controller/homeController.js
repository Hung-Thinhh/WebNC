const HomeController = (req, res) => {
    return res.render('main', {
        header: "header",
        footer: "footer"
        
    });
}
export {
    HomeController
}