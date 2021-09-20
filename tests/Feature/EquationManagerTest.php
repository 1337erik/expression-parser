<?php

namespace Tests\Feature;

use App\Http\Requests\EquationRequest;
use App\Models\Equation;
use App\Models\User;
use App\Service\EquationManager;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EquationManagerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * @var EquationManager
     */
    protected $manager;

    /**
     * @var User
    */
    protected $user;

    /**
     * Setup the test environment.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->seed();

        $this->manager = new EquationManager();
        $this->user = User::first();
        $this->actingAs( $this->user );
    }

    /**
     * @test
     * A basic feature test example.
     *
     * @return void
     */
    public function manager_reads_and_receives_proper_response()
    {
        $items = $this->manager->readItems();

        $this->assertCount( 2, $items );
        $items->each( function( $item ){
            // items received are properly scoped

            $this->assertEquals( $this->user->id, $item->user_id );
        });
    }

    /**
     * @test
     * Will make sure that adding a new equation will properly work
     * 
     * // TODO extend this to protect against users having multiple equations with the same variable
     */
    public function manager_add_test()
    {
        $expression = $this->faker->randomNumber . ' + ' . $this->faker->randomNumber;
        $request = new EquationRequest([

            'variable'   => 'c',
            'expression' => $expression
        ]);

        $this->manager->addItem( $request );

        $this->assertDatabaseCount( 'equations', 3 );
        $this->assertDatabaseHas( 'equations', [

            'variable'   => $request->variable,
            'expression' => $request->expression,
            'user_id'    => auth()->user()->id
        ]);
    }

    /**
     * @test
     */
    public function manager_update_test()
    {
        $expression = $this->faker->randomNumber . ' + ' . $this->faker->randomNumber;
        $request = new EquationRequest([

            'variable'   => 'd',
            'expression' => $expression
        ]);

        $existingEquation = Equation::find( 1 );
        $old_variable     = $existingEquation->variable;
        $old_expression   = $existingEquation->expression;
 
        $this->manager->updateItem( $request, $existingEquation );

        // make sure the new data exists in the database
        $this->assertDatabaseHas( 'equations', [

            'id'         => $existingEquation->id,
            'variable'   => $request->variable,
            'expression' => $request->expression,
            'user_id'    => auth()->user()->id
        ]);

        // make sure the old data does not exist anymore
        $this->assertDatabaseMissing( 'equations', [

            'id'         => $existingEquation->id,
            'variable'   => $old_variable,
            'expression' => $old_expression,
            'user_id'    => auth()->user()->id
        ]);
    }

    /**
     * @test
     */
    public function manager_delete_test()
    {
        $target = Equation::first();
        $this->manager->deleteItem( $target );

        // make sure the database is actually missing this recently-deleted object
        $this->assertDatabaseMissing( 'equations', $target->toArray() );

        $this->assertDatabaseCount( 'equations', 1 );
    }
}
