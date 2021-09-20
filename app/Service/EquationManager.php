<?php

namespace App\Service;

use App\Http\Requests\EquationRequest;
use App\Models\Equation;

/**
 * This class is used as the service-layer for the model class of Equation.
 * Very simple for this project - and typically I would abstract out CRUD functions to a trait
 * and keep the manager for anything extra and specific to this model class
 *
 */
class EquationManager
{
    /**
     * Grabs equations, automatically scoping to those owned by the auth-user
    */
    public function readItems()
    {
        return Equation::where( 'user_id', auth()->user()->id )->get();
    }

    /**
     * Accepts the Request object and uses it to create an equation, already scoped to the auth user
     * 
     * @param EquationRequest $request the data relevant to creating the equation object
    */
    public function addItem( EquationRequest $request )
    {
        return Equation::create( array_merge( $request->all(), [ 'user_id' => auth()->user()->id ] ) );
    }

    /**
     * Responsible for passing in data for updating of equations, no extra processing involved
     * 
     * @param EquationRequest $request the data relevant to updating the equation object
     * @param Equation $eq the object in quewstion being updated
    */
    public function updateItem( EquationRequest $request, Equation $eq )
    {
        return $eq->update( $request->all() );
    }

    /**
     * Responsible for simply deleting equations, no extra checks or processing involved
     * 
     * @param Equation $eq the object being deleted
    */
    public function deleteItem( Equation $eq )
    {
        return $eq->delete();
    }
}