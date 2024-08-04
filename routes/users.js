const router = require("express").Router();
const User = require("../models/User")

router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("ユーザ情報が更新されました");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        return res.status(403).json("あなたは自分のアカウントの時だけ情報を更新できます");
    }
});

// router.get("/", (req, res) => {
//     res.send("user router");
// });

module.exports = router;