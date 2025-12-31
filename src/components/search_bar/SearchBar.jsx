import React, {useState, useRef, useEffect} from 'react'
import Styles from './SearchBar.module.css'
import { useNavigate } from 'react-router-dom'

export const SearchBar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
        setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth < 1200;


    const toggleSearchBar = () => {
        setIsExpanded(!isExpanded);
        if (isExpanded && query.trim()) {
            handleSearchAction();
        }
    };

    // Focus input when expanded
    useEffect(() => {
        if (isExpanded && inputRef.current) {
        inputRef.current.focus();
        }
    }, [isExpanded]);

    // Collapse on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setIsExpanded(false);
        }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle search (example)
    const handleSearch = (e) => {
        setQuery(e.target.value);
    };

    // Collapse on Enter key
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setIsExpanded(false);
            handleSearchAction();
        }
    };

    const handleSearchAction = () => {
        if (query.trim()) {
            navigate(`/search?search_term=${encodeURIComponent(query)}`);
            setQuery(''); // Clear input after search
        }
    };

    return (
        <div className={`${Styles['search-container']} ${(isExpanded || isMobile) ? Styles['expanded'] : ''}`} ref={containerRef}>
            <div className={Styles['search-bar']}>
                <input
                    type="text"
                    placeholder="Buscar..."
                    className={Styles['search-input']}
                    value={query}
                    onChange={handleSearch}
                    onKeyDown={handleKeyPress}
                    ref={inputRef}
                    id='search-input'
                />
            </div>

            <button className={Styles['search-icon']} onClick={toggleSearchBar}>
                   <img src="../src/assets/icon-search.svg" alt="Search" />
            </button>
        </div>
  )
}

export default SearchBar;
