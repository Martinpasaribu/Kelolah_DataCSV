import  {  DataModel  }  from "../models/FormsModel.js";



export const createdata = async (req, res) => {
    const dataArray = req.body.data;

    try {
        for (const data of dataArray) {
            const { id, nama, email, telepon, alamat } = data;

            // Normalize email and telepon to ensure consistency
            const normalizedEmail = email.trim().toLowerCase();
            const normalizedTelepon = telepon.replace(/\s+/g, '');

            // Periksa apakah data dengan email, telepon, atau id yang sama sudah ada
            const existingData = await DataModel.findOne({ 
                $or: [
                    { email: normalizedEmail }, 
                    { telepon: normalizedTelepon },
                    { id: id }
                ]
            });

            if (!existingData) {
                // Jika data tidak ditemukan, simpan data baru
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
    
    
// Update data berdasarkan UUID
export const updateData = async (req, res) => {
    const { uuid } = req.params;
    const { nama, email, telepon, alamat } = req.body;
  
    try {
      const updatedData = await DataModel.findOneAndUpdate(
        { uuid: uuid },
        { nama, email, telepon, alamat },
        { new: true }
      );
  
      if (!updatedData) {
        return res.status(404).json({ msg: "Data tidak ditemukan" });
      }
  
      res.status(200).json(updatedData);
    } catch (error) {
      res.status(400).json({ msg: "Error mengupdate data" });
    }
  };
  
  // Hapus data berdasarkan UUID
  export const deleteData = async (req, res) => {
    const { uuid } = req.params;
  
    try {
      const deletedData = await DataModel.findOneAndDelete({ uuid: uuid });
  
      if (!deletedData) {
        return res.status(404).json({ msg: "Data tidak ditemukan" });
      }
  
      res.status(200).json({ msg: "Data berhasil dihapus" });
    } catch (error) {
      res.status(400).json({ msg: "Error menghapus data" });
    }
  };