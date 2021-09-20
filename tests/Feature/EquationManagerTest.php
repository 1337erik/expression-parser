<?php

namespace Tests\Feature;

use App\Models\User;
use App\Service\EquationManager;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EquationManagerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @var EquationManager
     */
    protected $manager;

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
        $user = User::first();
        $this->actingAs( $user );
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        dd( $this->manager->readItems() );
    }
}
