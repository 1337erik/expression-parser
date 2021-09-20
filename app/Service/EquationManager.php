<?php

namespace App\Service;

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
}