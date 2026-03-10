import slugify from 'slugify';
import ProductModel from '../models/product.model.js';

export const getAllProducts = async (req, res) => {
    try {
        //1. Lấy các tham só từ Query String
        const { page, limit, search, category, sort } = req.query;
        //2.Thiết lập giá trị mặc định nếu người dùng không truyền vào
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;
        //3. Xây dựng bộ lọc (filter)
        let queryCondition = {};
        if (search) {
            //Tìm kiếm không phân biệt hoa thường bằng Regex
            queryCondition.name = { $regex: search, $options: 'i' };
        }
        if (category) {
            queryCondition.category = categoty;
        }
        //4. Thực thi truy vấn Database
        const listProducts = await ProductModel.find(queryCondition)
            .sort(sort ? sort : '-createdAt')
            .limit(limit)
            .skip(skip);
        //5 Đếm tổng số sản phẩm để phía Frontend làm thanh phân trang
        const totalProducts = await ProductModel.countDocuments(queryCondition);
        res.status(200).send({
            message: 'Get list products successfully !',
            pagination: {
                total: totalProducts,
                page: page,
                limit: limit,
                totalPages: Math.ceil(totalProducts / limit)
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
            salePrice,
            stock,
            images,
            description,
            attributes
        } = req.body;
        //1.Tự động tạo slug từ name
        const slug = `${slugify(name, { lower: true })}-${Date.now()}`;
        //2.Kiểm tra xem slug đã tồn tại chưa
        const existingProduct = await ProductModel.findOne({ slug });
        if (existingProduct) {
            return res.status(400).send({
                message: 'Product is exsited !'
            });
        }
        //3. Tao san pham moi
        const newProduct = new ProductModel({
            name,
            slug,
            category,
            price,
            salePrice,
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
