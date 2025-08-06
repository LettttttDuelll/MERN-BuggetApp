import express from 'express'; 
import Bill from "../models/bill.js"
const router = express.Router();

//thêm 1 bill
router.post('/api/bills', async (req, res) => {
    try {
        if (
            !req.body.name || !req.body.money || !req.body.type//||!req.body.note||!req.body.ngayhomnay
        ) {
            return res.status(400).send('missing some thing ??')
        }
        const newBill = {
            name: req.body.name,
            money: req.body.money,
            type: req.body.type,
            note: req.body.note,
            ngayHienTai: req.body.ngayHienTai////noteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        };

        const bills = await Bill.create(newBill);
        return res.status(201).send(bills);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//gett all bills
router.get('/api/bills', async (req, res) => {
    try {
        const allBills = await Bill.find({});
        return res.status(201).json(allBills);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//delete 1 bill = id
router.delete('/api/bills/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteBill = await Bill.findByIdAndDelete(id);
        return res.status(200).json({
            message: 'Delete successful',
            deleted: deleteBill,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//update 1 bill by id
router.put('/api/bills/:id', async (req, res) => {
    try {
        if (!req.body.name || !req.body.money || !req.body.type || !req.body.note || !req.body.ngayHienTai) {
            return res.status(400).send('missing some thing ??')
        }
        //update chú ý đoạn dữ liệu của ngày tháng . nên đổi sang yyyy-MM-dd
        const { id } = req.params;
        const updateBill = await Bill.findByIdAndUpdate(id, req.body);

        return res.status(200).send('update successful');
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;