import React from "react";
import { Button } from "../Button";
import "./styles.css";

export function Pagination({
  page,
  maxPages,
  postsPerPage,
  onPageChange,
  onPostPerPageChange,
}) {
  const prevDisabled = page - 1 <= 0;
  const nextDisabled = page + 1 >= maxPages;

  return (
    <div className="container">
      <div className="pagination">
        <Button
          text={page - 1}
          onClick={() => onPageChange("prev")}
          disabled={prevDisabled}
        />
        <Button text={page} />
        <Button
          text={page + 1}
          onClick={() => onPageChange("next")}
          disabled={nextDisabled}
        />
      </div>
      <label htmlFor="postsPerPage">
        Posts per page:{" "}
        <select
          name="postsPerPage"
          id="postsPerPage"
          value={postsPerPage}
          onChange={(e) => onPostPerPageChange(Number(e.target.value))}
        >
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="32">32</option>
          <option value="64">64</option>
          <option value="128">128</option>
        </select>
      </label>
    </div>
  );
}
