const AboutController = (req, res) => {
    return res.render('about', {
        header: "header",
        footer: "footer",
        authen:req.user
        
    });
}
export {
    AboutController
}