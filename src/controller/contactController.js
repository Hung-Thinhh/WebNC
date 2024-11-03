const ContactController = (req, res) => {
    return res.render('contact', {
        header: "header",
        footer: "footer",
        authen:req.user
        
    });
}
export {
    ContactController
}