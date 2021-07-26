import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWishlistCateogory } from "../../app/reducer/wishlist-reducer"

const Wishlist = () => {
	const [selectedList, setSelectedList] = useState([]);
	const wishlistCategory = useSelector((state)=>{
		console.log('current state = ', state);
		return state.wishlist && state.wishlist.wishlistCategory
	});
	const wishlist = useSelector((state)=>state.wishlist && state.wishlist.wishlist);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchWishlistCateogory());
	}, []);

	console.log('wishlist ', wishlist);
	return (
		<div className="p-5">
			<div className="row">
				<div className="col-sm-12 col-md-4 col-lg-2">
					{
						wishlistCategory && wishlistCategory.map((item, index)=>(
							<Card key={index} className="p-4 mt-2" onClick={()=>{
								setSelectedList(item.listcontents);
							}}>
								<h3>{item.lname}</h3>
							</Card>
						))
					}
				</div>
				<div className="col-sm-12 col-md-8  col-lg-10 row">
					{ selectedList.map((item, index)=>(
						<Card key={index} className="col-sm-12 col-md-4 m-2 p-3" as="a" href={item.du} style={{ textDecoration: 'none' }} >
							<img alt="" class="swym-wishlist-image" src={item.iu} />
							<h4>{item.dt}</h4>
							<h5>${item.pr}</h5>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}

export default Wishlist;
