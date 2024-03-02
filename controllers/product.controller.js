import Product from '../models/product.model.js';

// Controller to handle getting all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to handle creating a new product
const createProduct = async (req, res) => {
    const { name, productCode, description, specifications, images, pdf, category, subcategory } = req.body;

    try {
        const newProduct = new Product({
            name,
            productCode,
            description,
            specifications,
            images,
            pdf,
            category,
            subcategory,
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to handle updating a product by ID
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, productCode, description, specifications, images, pdf, category, subcategory } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            name,
            productCode,
            description,
            specifications,
            images,
            pdf,
            category,
            subcategory,
        }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to handle deleting a product by ID
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(deletedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const uploadImportExcel = async (req, res) => {
    const jsonData = req.body; // Assuming your JSON data is in the request body
  
    try {
        const savedData = await Promise.all(
            (jsonData || []).map(async (product) => {
              const imageURL = product["images.imageUrl"] || null;
          
              const updatedProduct = {
                ...product,
                images: [{ imageUrl: imageURL }],
              };
          
              const savedProduct = await Product.create(updatedProduct);
          
              return savedProduct;
            })
          );
            
      res.status(201).json({ savedData });
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({ message: "Error saving data" });
    }
  };
  

export {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImportExcel,
};
