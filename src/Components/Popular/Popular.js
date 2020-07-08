import React, { Component } from 'react'
import './Popular.css'
import { withRouter } from 'react-router-dom'
import img1 from '../../asset/men2.png' 
import img2 from '../../asset/women.png' 
import img3 from '../../asset/electronics.webp' 
import img4 from '../../asset/book.webp' 

class Popular extends Component {
    state = {}

    onCategoryClick = (category) => {
        console.log
        this.props.history.push("/products/"+category)
    } 
    render() {
        return (
            <div className="popularDiv">
                <h3>Popular Categories</h3>
                <div className="popularItemDiv">
                    <div className="popularItem" onClick={()=>this.onCategoryClick("men's fashion")}>
                        <img src="https://www.amazon.in/images/G/31/img19/Fashion/MA19/2020/Brands/12._SY530_QL85_.jpg" />
                        <div className="ctgTitle">Men's Fashion</div>
                    </div>
                    <div className="popularItem" onClick={()=>this.onCategoryClick("women's fashion")}>
                        <img src="https://www.amazon.in/images/G/31/img19/Fashion/WA19/Jan2020_flip/brands/pantaloons._SY530_QL85_.jpg" />
                        <div className="ctgTitle">Women's Fashion</div>
                    </div>
                    <div className="popularItem" onClick={()=>this.onCategoryClick("electronics")}>
                        <img src="https://www.amazon.in/images/G/31/img18/PC/Laptops/Buyingguide/V83054589_IN_PC_Laptops_buyingguide_c_tile_670x645._CB460227352_.jpg" />
                        <div className="ctgTitle">Electronics</div>
                    </div>
                    <div className="popularItem" onClick={()=>this.onCategoryClick("books")}>
                        <img src="https://www.amazon.in/images/I/61VJ1kE+M+L._AC_SX184_.jpg" />
                        <div className="ctgTitle">Books</div>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(Popular);