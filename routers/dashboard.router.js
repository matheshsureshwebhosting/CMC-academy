const router = require("express").Router()

router.get("/", async (req, res) => {
    res.render("dash")
})
router.get("/profile", async (req, res) => {
    res.render("dash-profile")
})
router.get("/mycourses", async (req, res) => {
    res.render("dash-mycourses")
})
router.get("/feedback", async (req, res) => {
    res.render("dash-feedback")
})
router.get("/feedback", async (req, res) => {
    res.render("dash-feedback")
})
router.get("/feedbackvideo", async (req, res) => {
    res.render("dash-feedback-video")
})
router.get("/certificate", async (req, res) => {
    res.render("dash-certificate")
})


module.exports = router