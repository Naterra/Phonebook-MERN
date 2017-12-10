import React from 'react';

const alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];


const AlphabetMenue = ({set_filter_term, active_term}) =>{
        return(
            <div className="alphabet card teal lighten-2" >
            <div className="" >
                <div className="btn-group center">
                    {alpha.map(elem=>
                            <button
                                onClick={(e) =>   set_filter_term(elem, e) }
                                className={active_term === elem ? 'btn white-text teal  waves-effect waves-light' : 'btn white-text teal lighten-2 waves-effect waves-light' }
                                key={elem}><a className="" >{elem}</a>
                            </button>
                    )}
                </div>
            </div>
            </div>
        )
}

export default AlphabetMenue;