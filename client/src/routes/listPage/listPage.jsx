import "./listPage.scss";
import Filter from "../../components/filter/Filter"
import Card from "../../components/card/Card"
import Map from "../../components/map/Map";
import { Await, useLoaderData, useSearchParams } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {
  const data = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;

  const changePage = (newPage) => {
    setSearchParams(prev => {
      prev.set("page", newPage);
      return prev;
    });
  };

  return <div className="listPage">
    <div className="listContainer">
      <div className="wrapper">
        <Filter/>
        <Suspense fallback={<p>Cargando...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error cargando propiedades!</p>}
          >
            {(postResponse) => {
              const { posts, total } = postResponse.data;
              const totalPages = Math.ceil(total / 10);
              return (
                <>
                  {posts.map(post => (
                    <Card key={post.id} item={post}/>
                  ))}
                  {totalPages > 1 && (
                    <div className="pagination">
                      <button
                        onClick={() => changePage(page - 1)}
                        disabled={page <= 1}
                      >
                        &lt;
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <button
                          key={p}
                          onClick={() => changePage(p)}
                          className={p === page ? "active" : ""}
                        >
                          {p}
                        </button>
                      ))}
                      <button
                        onClick={() => changePage(page + 1)}
                        disabled={page >= totalPages}
                      >
                        &gt;
                      </button>
                    </div>
                  )}
                </>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </div>
    <div className="mapContainer">
      <Suspense fallback={<p>Cargando...</p>}>
        <Await
          resolve={data.postResponse}
          errorElement={<p>Error cargando propiedades!</p>}
        >
          {(postResponse) => 
            <Map items={postResponse.data.posts}/>
          }
        </Await>
      </Suspense>
    </div>
  </div>;
}

export default ListPage;
