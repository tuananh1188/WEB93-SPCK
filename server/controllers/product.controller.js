import ProductModel from '../models/product.model.js';

export const getAllProducts = async (req, res) => {
    try {
        //1. Lấy các tham só từ Query String
        const { page, limit, search, category, sort } = req.query;
        //2.Thiết lập giá trị mặc định nếu người dùng không truyền vào
        const pageNum = parseInt(page, 10) || 1;
        const limitNum = parseInt(limit, 10) || 10;
        const skip = (pageNum - 1) * limitNum;
        //3. Xây dựng bộ lọc (filter)
        let queryCondition = {};
        if (search) {
            //Tìm kiếm không phân biệt hoa thường bằng Regex
            queryCondition.name = { $regex: search, $options: 'i' };
        }
        if (category) {
            queryCondition.category = category;
        }
        //4. Thực thi truy vấn Database
        const sortQuery = sort && sort !=='undefined'? sort : '-createdAt'
        const listProducts = await ProductModel.find(queryCondition)
            .sort(sortQuery)
            .limit(limitNum)
            .skip(skip);
        //5 Đếm tổng số sản phẩm để phía Frontend làm thanh phân trang
        const totalProducts = await ProductModel.countDocuments(queryCondition);
        res.status(200).send({
            message: 'Get list products successfully !',
            pagination: {
                total: totalProducts,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(totalProducts / limitNum)
            },
            data: listProducts
        });
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        const {
            name,
            category,
            price,
            stock,
            images,
            description,
            attributes
        } = req.body;
        //2.Kiểm tra xem san pham đã tồn tại chưa
        const existingProduct = await ProductModel.findOne({ name });
        if (existingProduct) {
            return res.status(400).send({
                message: 'Product is exsited !'
            });
        }
        //3. Tao san pham moi
        const newProduct = new ProductModel({
            name,
            category,
            price,
            stock,
            images,
            description,
            attributes
        });

        const savedProduct = await newProduct.save();
        res.status(201).send({
            message: 'Create product successfully !',
            data: savedProduct
        });
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};
