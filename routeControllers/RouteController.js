const asyncHandler = require("express-async-handler");
const contactModel = require("../models/contactModel");





// desc Get all the contacts
// @route GET /contacts/
// @access private
const get_Contacts = asyncHandler(async (req, res) => {
    const contacts = await contactModel.find({ user_id: req.user.id });
    res.status(200).json(contacts);
})



// desc Create the contacts
// @route POST /contacts/
// @access private
const post_Contacts = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, sex, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(404).json({ message: "All Fields are Mendotory" })
    }

    const contact = await contactModel.create({
        name, sex, phone, email, user_id: req.user.id
    });
    res.status(201).json(contact)
})





// desc Get a the contacts
// @route GET /contacts/:id
// @access private
const get_Contact = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404).json({ message: "Invalid UserId" });
    }
    res.status(200).json(contact);
})






// desc Update a the contacts
// @route PUT /contacts/:id
// @access private
const put_Contacts = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(403).json({ message: "Error Occurred" })

    }

    const updateContact = await contactModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(201).json(updateContact)
})




// desc delete the contacts
// @route DEL /contacts/:id
// @access private
const del_Contacts = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404).json({ message: "Invalid Details" })
        // throw new Error("can't not found");
    }

    await contactModel.remove();
    res.status(200).json(contact);
})



module.exports = {
    get_Contacts,
    get_Contact,
    post_Contacts,
    del_Contacts,
    put_Contacts
}