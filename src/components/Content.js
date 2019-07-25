import React from 'react';
import axios from 'axios';
import Spinner from 'react-spinner-material';

import  '../App.css';

class Content extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		    movie_data: null,
		    total: 0,
		    per_page: 10,
		    current_page: 1,
		    loading: true
		  };
	}
	componentDidMount() {
    	this.makeHttpRequestWithPage(1, this.props.search);
  	}

  	makeHttpRequestWithPage = async (pageNumber, search) => {
     axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=fa281222&s='+search+'&page='+pageNumber)
	  .then(res => {
	  	this.setState({
	      movie_data: (res.data.Search) ? res.data.Search : null,
	      total: res.data.totalResults ? res.data.totalResults : 0,
	      loading: false,
	      //per_page: data.per_page,
	      current_page: pageNumber
	    });
	  });
  }

  
	render() {
		if(this.props.search !=''){
			this.makeHttpRequestWithPage(this.state.current_page, this.props.search);
		}
		const loadingspinner = this.state.loading;
		let movie_data, renderPageNumbers;
		if (this.state.movie_data !== null) {
	      movie_data = this.state.movie_data.map(mov => (
	      <div className="col-lg-3 col-md-6 col-xs-12" key = {mov.imdbID}>
	        <div className="card h-100">
	          <img className="card-img-top" height="500" src={(mov.Poster !==null && mov.Poster !== 'N/A') ? mov.Poster : 'images.png' } alt="" />
	          <div className="card-body">
	            <h6 className="card-title">Name: {mov.Title}</h6>
	            <p className="card-text">Year: {mov.Year}</p>
	            <p className="card-text">imdbID: {mov.imdbID}</p>
	            <p className="card-text">Type: {mov.Type}</p>
	          </div>
	        </div>
	      </div>
	      ));
	    }else
	    {
	    	const loadingspinner = true;
	    	movie_data = <div className="no_result"> No results found! </div>;
	    }

	    const pageNumbers = [];
	    if (this.state.total !== null) {
		      for (let i = 1; i <= Math.ceil(this.state.total / this.state.per_page); i++) {
		        pageNumbers.push(i);
		      }

		      renderPageNumbers = pageNumbers.map(number => {
				  let classes = this.state.current_page === number ? 'active' : '';

				  return (
				    <li key={number} className={classes} onClick={() => this.makeHttpRequestWithPage(number, this.props.search)}>{number}</li>
				  );
				});
		  }

		return (
				<div className="col-xs-12">
					<div className="container-fluid content">
						<h3> You searched for: {this.props.search}, {this.state.total} results found </h3>
						{
							loadingspinner ? (
									<Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} />
								) : (
									<div>
									<div className="row text-center">
										{movie_data}
									</div>
									{ (this.state.total > 10) && (
											<div className="col-xs-12">
											<div className="text-center pagination">
											<ul>
											<li onClick={() => this.makeHttpRequestWithPage(1, this.props.search)}>&laquo;</li>
								         		{renderPageNumbers}
								        	<li onClick={() => this.makeHttpRequestWithPage(this.state.total, this.props.search)}>&raquo;</li>
								        	</ul>
									    	</div>
									    	</div>
										)}
							    	</div>
								)
						}
				    </div>
				</div>
				);
	}
}
export default Content;