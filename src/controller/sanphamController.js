
import {getListSp,getSp} from "../service/sanphamService";

const getListSanPham = async (req, res) => {
    const id = req.params.id;
    let data = await getListSp(id);   
    if (data) {
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
          });
    }
}
const getSanPham = async (req, res) => {
    const id = req.params.id;
    let data = await getSp(id);   
    if (data) {
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
          });
    }
}
export {getListSanPham,getSanPham}