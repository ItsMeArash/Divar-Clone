import { useQuery } from "@tanstack/react-query";
import Main from "components/templates/Main";
import Sidebar from "components/templates/Sidebar";
import { getAllPosts } from "services/user";
import Loader from "components/modules/Loader";
import { getCategory } from "services/admin";

const HomePage = () => {
    const { data: posts, isLoading: postLoading } = useQuery(["post-list"], getAllPosts);
    const { data: categories, isLoading: categoryLoading } = useQuery(["get-categories"], getCategory);

    return (
        <>
            {postLoading || categoryLoading ? (
                <Loader />
            ) : (
                <div style={{ display: "flex" }}>
                    <Sidebar categories={categories}/>
                    <Main posts={posts} />
                </div>
            )}
        </>
    );
};

export default HomePage;
