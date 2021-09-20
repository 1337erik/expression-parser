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
     * Grabs equations, automatically scoping to those owned by the auth-user
    */
    public function updateItem()
    {
        return Equation::where( 'user_id', auth()->user()->id )->get();
    }

    /**
     * Grabs equations, automatically scoping to those owned by the auth-user
    */
    public function deleteItem()
    {
        return Equation::where( 'user_id', auth()->user()->id )->get();
    }
}