// SearchPage.js
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import universeImg from '@/assets/universe.png';
import { ToolOverview } from '@/models/ToolOverview';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import SearchResultCard from '@/components/SearchResultCard';
import { NumberSelector } from '@/components/NumberSelector';
import { CustomPagination } from '@/components/CustomPagination';

const SearchPage = () => {

    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [totalPages, setTotalPages] = useState(0);
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const [results, setResults] = useState<[ToolOverview] | null>(null)
    const [totalResults, setTotalResults] = useState(0)
    const [abortController, setAbortController] = useState<AbortController | null>(null); // Keep track of AbortController


    // Debounce the query input: wait before setting the debounced value
    useEffect(() => {
        setResults(null)
        const timerId = setTimeout(() => {
            //setPage(1)
            setDebouncedQuery(query);
        }, 200);

        // Clean up the timer when query changes
        return () => {
            clearTimeout(timerId);
        };
    }, [query]);

    // Trigger the fetch request when the debounced query changes
    useEffect(() => {
        if (debouncedQuery == "") {
            setResults(null)
        } else {
            if (abortController) {
                abortController.abort();
            }
            const newAbortController = new AbortController();
            setAbortController(newAbortController); // Store the new controller for the current request

            fetchData(debouncedQuery, newAbortController);
        }
    }, [debouncedQuery, page, perPage]);

    // Function to fetch data
    const fetchData = async (searchTerm: string, controller: AbortController) => {
        try {
            if (!searchTerm)
                return

            console.log(searchTerm)
            const url = `https://marketplace-api.sshopencloud.eu/api/item-search?q=${searchTerm}&categories=tool-or-service&page=${page}&perpage=${perPage}&advanced=false&includeSteps=false`
            const response = await fetch(url, {
                signal: controller.signal, // Attach the AbortController's signal
            });
            const data = await response.json();

            // Exit if the response is no longer the current query
            console.log(searchTerm + "  " + query)
            if (searchTerm != query) {
                return
            }

            setTotalPages(data.pages)
            setTotalResults(data.hits)
            console.log(data)
            console.log(data.items)

            setResults(data.items.map((item: any) => {
                return {
                    id: item.persistentId,
                    label: item.label,
                    description: item.description,
                    accessibleAt: item.accessibleAt,
                    contributors: item.contributors.map(c => c.actor.name),
                }
            })); // Assuming 'data' contains the fetched results
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className='max-w-2xl mx-auto'>
            <h1 className="my-12 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Tool & Service Search
            </h1>
            <Input className="mb-8 max-w-lg mx-auto" placeholder="Search..." type="text" value={query} onChange={v => setQuery(v.target.value)}>
            </Input>

            {query == "" ?
                <div className='mt-8'>
                    <p className='mb-4 text-muted-foreground'>
                        Don't be shy, there is a whole universe of tools for you to explore...
                    </p>
                    <img className='max-w-md rounded-lg mx-auto' src={universeImg} alt="" />
                </div> :
                results == null ? <p>Loading...</p> :
                    <div className='w-full text-start mt-18'>
                        <div className='flex justify-between'>
                            <h2 className='scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl mb-4'>Results({totalResults}):</h2>
                            <NumberSelector current={perPage} available={[10, 20, 30, 50]} onChange={(newPerPage) => { setPage(1); setPerPage(newPerPage) }} />
                        </div>
                        {totalResults == 0 && <p className='text-muted-foreground text-center'>No results? Maybe try a different query?</p>}
                        {results.map(item => (
                            <SearchResultCard key={item.id} result={item}></SearchResultCard>
                        ))}

                        <CustomPagination current={page} total={totalPages} onChange={setPage} />
                    </div>
            }
        </div >
    );
};

export default SearchPage;