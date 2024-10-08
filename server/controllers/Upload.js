import  {  DataModel  }  from "../models/FormsModel.js";

export const createdata = async (req, res) => {
    const dataArray = req.body.data;

    try {
        for (const data of dataArray) {
            const { id, nama, email, telepon, alamat } = data;

        
            const normalizedEmail = email.trim().toLowerCase();
            const normalizedTelepon = telepon.replace(/\s+/g, '');


            const existingData = await DataModel.findOne({ 
                $or: [
                    { email: normalizedEmail }, 
                    { telepon: normalizedTelepon },
                    { id: id }
                ]
            });

            if (!existingData) {
        
                await DataModel.create({
                    id: id,
                    nama: nama,
                    email: normalizedEmail,
                    telepon: normalizedTelepon,
                    alamat: alamat,
                });
            }
        }
        res.status(201).json({ msg: "Data berhasil disimpan, duplikat dilewati" });
    } catch (error) {
        res.status(400).json({ msg: "Error menyimpan data" });
    }
};


// =========================  GET =============================

export const getdata = async(req, res) =>
    {
        try {
            const data = await DataModel.find({}); // Mengambil hanya UUID pengguna
            res.status(200).json(data); // Mengembalikan array UUID pengguna
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }
    
    
