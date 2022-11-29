import React from "react";

export const Categories = (props) => {

    const categories = props.data.categories;

    const categoriesElement = categories.map( (category, index) => {
        const styles = props.data.selected === category ? {backgroundColor:"#293264", color:"white"} : {backgroundColor:"#F5F7FB"}
        return <div key={index} style={styles} className = "category" onClick={() => props.handleCategory(props.data.id, category)}>{category}</div>
    })
    
    return (
        <div className="categories">
            {categoriesElement}
        </div> 
    )
}