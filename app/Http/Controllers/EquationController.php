<?php

namespace App\Http\Controllers;

use App\Http\Requests\EquationRequest;
use App\Models\Equation;

class EquationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([ 'equations' => Equation::where( 'user_id', auth()->user()->id )->get() ]);
    }

    /**
     * Store a newly created resource in storage.
     * 
     *
     * @param  App\Http\Requests\EquationRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(EquationRequest $request)
    {
        if( $newEquation = Equation::create( array_merge( $request->validated(), [ 'user_id' => auth()->user()->id ] ) ) ) return response()->json([ 'newEquation' => $newEquation ]);

        return response()->json([ 'newEquation' => null ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  App\Http\Requests\EquationRequest  $request
     * @param  \App\Models\Equation  $equation
     * @return \Illuminate\Http\Response
     */
    public function update(EquationRequest $request, Equation $equation)
    {
        if( $equation->update( array_merge( $request->validated() ) ) ) return response()->json([ 'updatedEquation' => $equation->fresh() ]);

        return response()->json([ 'updatedEquation' => null ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Equation  $equation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Equation $equation)
    {
        return response()->json([ 'success' => $equation->delete() ]);
    }
}
