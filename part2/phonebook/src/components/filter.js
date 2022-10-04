const Filter = ({value, handleChangeFilter, persons}) => {
    // console.log(persons)
    return (
        <div>
            <div>
                filter with:
                <input onChange={handleChangeFilter} value={value} />
            </div>
            {/* {persons.filter} */}
        </div>
    )
}

export default Filter;
