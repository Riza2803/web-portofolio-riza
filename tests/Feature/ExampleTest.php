<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        foreach (['/', '/about', '/experience', '/project', '/contact'] as $route) {
            $response = $this->get($route);
            $response->assertStatus(200);
            $response->assertSeeInOrder([
                'js/vendor/gsap.min.js',
                'js/vendor/ScrollTrigger.min.js',
                'js/vendor/Flip.min.js',
                'js/vendor/motion.min.js',
                'js/vendor/lenis.min.js',
                'js/app.js',
            ], false);
        }

        foreach (['gsap.min.js', 'ScrollTrigger.min.js', 'Flip.min.js', 'motion.min.js', 'lenis.min.js'] as $bundle) {
            $this->assertFileExists(public_path("js/vendor/{$bundle}"));
        }

        $this->assertFileExists(public_path('img/mywork.png'));

        $projectPage = $this->get('/project');
        $projectPage->assertSee('MyWork: Task & Schedule Manager');
        $projectPage->assertSee('https://github.com/Riza2803/MyWork-app', false);
        $projectPage->assertSee('img/mywork.png', false);

        $aboutPage = $this->get('/about');
        $aboutPage->assertSeeInOrder(['6', 'Proyek Selesai']);
    }
}
