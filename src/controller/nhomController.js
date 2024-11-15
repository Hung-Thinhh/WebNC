
import {getAllNhom} from "../service/nhomService";

const getNhom = async(req,res) => {
    let data = await getAllNhom();   
    if (data) {
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
          });
    }
}
export {getNhom}