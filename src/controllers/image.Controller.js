const uploadImage = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a file' });
        }
        console.log(req.file);
        const imageUrl = `/images/${req.file.filename}`

        return res.status(200).json({ status: true, message: "Image uploaded successfully.", imageUrl });

    } catch (error) {
        console.error('Error uploading image:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = uploadImage;