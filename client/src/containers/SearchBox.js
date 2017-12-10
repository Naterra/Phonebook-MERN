import React, { Component } from 'react';

//Redux
import { connect } from 'react-redux';
import { set_filter_term, reset_filter, reset_pager } from '../actions';


class SearchBox extends Component{
    constructor(props){
        super(props);

        this.keyUpHandler = this.keyUpHandler.bind(this);
    }

    keyUpHandler(term){
        console.warn(term.length, 'term.length');

        //reset Pager  each time when term is changed
        this.props.reset_pager();

        //If before was used Alphabet search type and paging may be used also, reset state.filter and paging to 1 page
        // if(term.length>0 && this.props.filter.type !== 'search' ){
        //     // this.props.reset_filter();
        // }

        if(term.length>0){
            this.props.set_filter_term( { term:term, type:'search' } );
        }
        else{

            //Set to default if searchbox is cleaned
            console.warn('reset_filter()');
            this.props.reset_filter();
        }


    }

    //UPDATERS
    componentWillReceiveProps(nextProps) {
        console.log(nextProps, 'componentWillReceiveProps');



        //clean up search input if filter type was changed
          if(nextProps.filter.type !== 'search' ){
            this.search_input.value ='';
        }
        else{}
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     //reset pager to 0 when start using searchbox
    //     // if(nextProps.filter.type !== 'search'){}
    //     return this.props.filter !== nextProps.filter ?    false : true ;
    // }

    render(){
        return(
            <div className="fake-input right">
                <div className="label-icon" htmlFor="search">
                    <i className="material-icons small teal-text">search</i>
                </div>

                <input
                    type="search"
                    ref = {node=>{this.search_input=node;}}
                    className="search-input"
                    placeholder="Who to find?"
                    onKeyUp={el => this.keyUpHandler(el.target.value) }
                />
            </div>
        )
    }
}

function mapStateToProps(state){
   return {
       filter: state.filter
   }
}

export default connect(mapStateToProps, { set_filter_term, reset_filter, reset_pager })(SearchBox);