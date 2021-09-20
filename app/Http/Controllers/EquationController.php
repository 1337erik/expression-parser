<?php

namespace App\Http\Controllers;

use App\Http\Requests\EquationRequest;
use App\Models\Equation;
use App\Service\EquationManager;

class EquationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param EquationManager $mgr the service class responsible for providing the logic for this method
     * @return \Illuminate\Http\Response
     */
    public function index( EquationManager $mgr )
    {
        return response()->json([ 'equations' => $mgr->readItems() ]);
    }

    /**
     * Store a newly created resource in storage.
     * 
     * @param EquationManager $mgr the service class responsible for providing the logic for this method
     * @param  App\Http\Requests\EquationRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store( EquationManager $mgr, EquationRequest $request )
    {
        if( $newEquation = $mgr->addItem( $request ) ) return response()->json([ 'newEquation' => $newEquation ]);

        return response()->json([ 'newEquation' => null ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param EquationManager $mgr the service class responsible for providing the logic for this method
     * @param  App\Http\Requests\EquationRequest  $request
     * @param  \App\Models\Equation  $equation
     * @return \Illuminate\Http\Response
     */
    public function update( EquationManager $mgr, EquationRequest $request, Equation $equation )
    {
        if( $mgr->updateItem( $request, $equation ) ) return response()->json([ 'updatedEquation' => $equation->fresh() ]);

        return response()->json([ 'updatedEquation' => null ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param EquationManager $mgr the service class responsible for providing the logic for this method
     * @param  \App\Models\Equation  $equation
     * @return \Illuminate\Http\Response
     */
    public function destroy( EquationManager $mgr, Equation $equation )
    {
        return response()->json([ 'success' => $mgr->deleteItem( $equation ) ]);
    }
}
