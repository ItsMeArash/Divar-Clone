import { useQuery } from "@tanstack/react-query";
import { getCategory } from "services/admin";
import Loader from "components/modules/Loader";

import styles from "./CategoryList.module.css";

const CategoryList = () => {
    const { data, isLoading } = useQuery(["get-categories"], getCategory);

    console.log({ data, isLoading });
    return (
        <div className={styles.list}>
            {isLoading ? (
                <Loader />
            ) : (
                data.data.map((category) => (
                    <div key={category._id}>
                        <img src={`${category.icon}.svg`} />
                        <h3>{category.name}</h3>
                        <p>slug: {category.slug}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default CategoryList;
