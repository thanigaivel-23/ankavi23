import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { getProducts } from '../actions/productAction';
import { clearError } from '../slices/productSlice';
import Loader from './layouts/Loader';
import NavBar from './layouts/NavBar';
import Footer from './layouts/Footer';
import MetaData from './layouts/MetaData';
import InfiniteScroll from 'react-infinite-scroll-component'

const Category = () => {

    const { category } = useParams()
    const dispatch = useDispatch()
    const { loading, products, error } = useSelector(state => state.productState)


    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center' })
            dispatch(clearError)
        }

        dispatch(getProducts(null, category, page))

    }, [dispatch, error, category, page])

    useEffect(() => {
        window.scrollTo({ top: 0 });

    }, []);

    const fetchData = async () => {

        setItems(prevItems => [...prevItems, ...products]);

        setPage(prevPage => prevPage + 1);

        if (products.length === 0) {
            setHasMore(false);
        }
    };


    return (
        <>
            <MetaData title={'Ankavi Silks - Sarees'} />

            <NavBar />

            <InfiniteScroll
                dataLength={items.length}
                next={fetchData}
                hasMore={hasMore}
            />

            <section className='tw-mt-16 md:tw-mt-24'>
                <p className='tw-font-bold tw-text-center tw-text-xl md:tw-text-2xl tw-mx-5 md:tw-mx-10 tw-mt-16'>{category === 'Traditional_Pure_Zari' ? 'Traditional Pure Zari Sarees' : "Half Fine Sarees"}</p>

                <main className='tw-grid tw-grid-cols-2 sm:tw-grid-cols-2 lg:tw-grid-cols-4 lg:tw-gap-5 tw-mt-10 lg:tw-mx-20'>
                    {items && items.map((product, index) => (
                        <Link to={`/product/${product._id}`} key={index} className='tw-no-underline hover:tw-bg-white hover:tw-shadow-2xl tw-duration-200 tw-px-2 tw-pt-2 md:tw-px-5 md:tw-pt-5 tw-rounded-md tw-rounded-tl-3xl tw-rounded-br-3xl'>
                            <img src={product.images[0].image} alt="" className=' tw-rounded-md tw-rounded-tl-3xl tw-rounded-br-3xl  tw-object-' />
                            <p className='tw-truncate tw-mt-4 tw-px-2 tw-text-[#808080]'>{product.name}</p>
                            <p className='tw-pl-3 tw-font-bold tw-text-black tw-text-lg'>₹ {product.price}</p>
                        </Link>
                    ))}
                </main>
                {loading && <Loader />}
            </section>


            <Footer />
        </>
    )
}

export default Category