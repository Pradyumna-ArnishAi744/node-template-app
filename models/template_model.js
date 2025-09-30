const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const {v4: UUIDV4} = require("uuid")

const Document = sequelize.define("documents", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Name is Required" },
        },
    },
    text: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Text is Required" },
        },
    },
    placeholder: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Placeholder is Required" },
        },
    },
    document: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Document is required" },
            is: {
                args: /\.(docx|doc)$/i,
                msg: "Document must be a .doc or .docx file",
            },
        },
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    timestamps: true,    // show timestamps
});

module.exports = Document;
