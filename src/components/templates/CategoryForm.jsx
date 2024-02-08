import { useState } from "react";
import styles from "./CategoryForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "services/admin";

const CategoryForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        icon: "",
    });

    const queryClient = useQueryClient();

    const { mutate, isLoading, error, data } = useMutation(addCategory, {
        onSuccess: () => queryClient.invalidateQueries("get-categories")
    });

    const changeHandler = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (!formData.name || !formData.slug || !formData.icon) return;

        mutate(formData);
    };

    return (
        <form
            onChange={changeHandler}
            onSubmit={submitHandler}
            className={styles.form}
        >
            <h3>دسته‌بندی جدید</h3>
            {!!error && <p>افزودن دسته‌بندی با خطا مواجه شد.</p>}
            {data?.status === 201 && <p>دسته‌بندی با موفقیت افزوده شد.</p>}
            <label htmlFor="name">نام دسته‌بندی</label>
            <input type="text" name="name" id="name" />
            <label htmlFor="slug">اسلاگ</label>
            <input type="text" name="slug" id="slug" />
            <label htmlFor="icon">آیکون</label>
            <input type="text" name="icon" id="icon" />

            <button type="submit" disabled={isLoading}>ایجاد</button>
        </form>
    );
};

export default CategoryForm;
