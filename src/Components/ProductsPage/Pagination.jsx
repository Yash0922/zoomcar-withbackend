import { Link } from "react-router-dom";
import PaginationCSS from "./Pagination.module.css";
import { useContext } from "react";
import { MainContext } from "../Context/MainContextProvider";

export default function Pagination() {
  let { page, totalPage, setPage } = useContext(MainContext);
  return (
    <div style={{ margin: "3rem 0 1rem 0" }}>
      <div className={PaginationCSS.pageContainer}>
        <div>
          {page <= 1 ? (
            <Link
              style={{ pointerEvents: "none" }}
              to={`/products/page=${page - 1}`}
            >
              <button
                disabled={page <= 1}
                onClick={() => {
                  setPage(page - 1);
                }}
                className={PaginationCSS.btn}
              >
                <i class="bi bi-arrow-left"></i>
              </button>
            </Link>
          ) : (
            <Link to={`/products/page=${page - 1}`}>
              <button
                disabled={page <= 1}
                onClick={() => {
                  setPage(page - 1);
                }}
                className={PaginationCSS.btn}
              >
                <i class="bi bi-arrow-left"></i>
              </button>
            </Link>
          )}
        </div>
        <div className={PaginationCSS.currentNumber}>{page}</div>
        <div>
          {page >= totalPage ? (
            <Link
              style={{ pointerEvents: "none" }}
              to={`/products/page=${page + 1}`}
            >
              <button
                disabled={page >= totalPage}
                onClick={() => {
                  setPage(page + 1);
                }}
                className={PaginationCSS.btn}
              >
                <i class="bi bi-arrow-right"></i>
              </button>
            </Link>
          ) : (
            <Link to={`/products/page=${page + 1}`}>
              <button
                disabled={page >= totalPage}
                onClick={() => {
                  setPage(page + 1);
                }}
                className={PaginationCSS.btn}
              >
                <i class="bi bi-arrow-right"></i>
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
