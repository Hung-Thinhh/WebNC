const HomeController = (req, res) => {
    return res.render('main', {
        header: "header",
        footer: "footer",
        authen:req.user
        
    });
}
export {
    HomeController
}