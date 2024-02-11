import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCategory } from "services/admin";

import styles from "./AddPost.module.css";
import { getCookie } from "utils/cookie";
import axios from "axios";
import toast from "react-hot-toast";

const AddPost = () => {
    const [formDetails, setFormDetails] = useState({
        title: "",
        content: "",
        category: "",
        city: "",
        amount: null,
        images: null,
    });

    const { data } = useQuery(["get-categories"], getCategory);

    const changeHandler = (event) => {
        const name = event.target.name;

        if (name !== "images") {
            setFormDetails({ ...formDetails, [name]: event.target.value });
        } else {
            setFormDetails({ ...formDetails, [name]: event.target.files[0] });
        }
    };

    const addHandler = (event) => {
        event.preventDefault();

        const formData = new FormData();
        for (let formField in formDetails) {
            formData.append(formField, formDetails[formField]);
        }

        const token = getCookie("accessToken");
        axios
            .post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
                headers: {
                    contentType: "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => toast.success(response.data.message))
            .catch(() => toast.error("مشکلی پیش آمده است!"));
    };

    return (
        <form onChange={changeHandler} className={styles.form}>
            <h3>افزودن آگهی</h3>
            <label htmlFor="title">عنوان</label>
            <input type="text" name="title" id="title" />
            <label htmlFor="content">توضیحات</label>
            <textarea name="content" id="content" />
            <label htmlFor="amount">قیمت</label>
            <input type="number" name="amount" id="amount" />
            <label htmlFor="city">شهر</label>
            <input type="text" name="city" id="city" />
            <label htmlFor="category">دسته‌بندی</label>
            <select name="category" id="category">
                {data?.data.map((category) => (
                    <option key={category._id} value={category._id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <label htmlFor="images">عکس</label>
            <input type="file" name="images" id="images" />

            <button onClick={addHandler}>ایجاد</button>
        </form>
    );
};

export default AddPost;
