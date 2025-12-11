/**
 * Script simple para probar los endpoints de la API
 * Ejecutar con: npm run test:endpoints
 * Requiere que el servidor esté corriendo en http://localhost:3001
 */

const API_BASE_URL = 'http://localhost:3001/api';

interface TestResult {
  name: string;
  status: '✅' | '❌';
  message: string;
  data?: unknown;
}

async function testEndpoint(
  name: string,
  url: string,
  options?: RequestInit,
): Promise<TestResult> {
  try {
    console.log(`\n🧪 Probando: ${name}`);
    console.log(`   URL: ${url}`);

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      console.log(`   ✅ Status: ${response.status}`);
      return {
        name,
        status: '✅',
        message: `OK (${response.status})`,
        data,
      };
    } else {
      console.log(`   ❌ Status: ${response.status}`);
      return {
        name,
        status: '❌',
        message: `Error ${response.status}: ${data.message || 'Unknown error'}`,
        data,
      };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.log(`   ❌ Error: ${errorMessage}`);
    return {
      name,
      status: '❌',
      message: errorMessage,
    };
  }
}

async function runTests() {
  console.log('🚀 Iniciando pruebas de endpoints...\n');
  console.log('⚠️  Asegúrate de que el servidor esté corriendo en http://localhost:3001\n');

  const results: TestResult[] = [];

  // 1. Health check
  results.push(
    await testEndpoint('Health Check', `${API_BASE_URL}/health`),
  );

  // 2. Listado de productos (básico)
  results.push(
    await testEndpoint(
      'Listado de productos (básico)',
      `${API_BASE_URL}/products?page=1&limit=5`,
    ),
  );

  // 3. Listado con filtros
  results.push(
    await testEndpoint(
      'Listado con filtros (category=unisex)',
      `${API_BASE_URL}/products?category=unisex&limit=3`,
    ),
  );

  // 4. Búsqueda
  results.push(
    await testEndpoint(
      'Búsqueda de productos',
      `${API_BASE_URL}/products?search=sostenibles&limit=3`,
    ),
  );

  // 5. Detalle por slug (si hay productos en la BD)
  const listResponse = await fetch(`${API_BASE_URL}/products?limit=1`);
  if (listResponse.ok) {
    const listData = (await listResponse.json()) as { data: Array<{ slug: string; id: string }> };
    if (listData.data && listData.data.length > 0) {
      const product = listData.data[0];
      
      // Detalle por ID
      results.push(
        await testEndpoint(
          'Detalle por ID',
          `${API_BASE_URL}/products/${product.id}`,
        ),
      );

      // Detalle por slug
      results.push(
        await testEndpoint(
          'Detalle por slug',
          `${API_BASE_URL}/products/slug/${product.slug}`,
        ),
      );
    } else {
      results.push({
        name: 'Detalle (skip)',
        status: '❌',
        message: 'No hay productos en la BD para probar',
      });
    }
  }

  // 6. Error 404 (producto inexistente)
  results.push(
    await testEndpoint(
      'Error 404 (producto inexistente)',
      `${API_BASE_URL}/products/clxxx999999999999999999`,
    ),
  );

  // 7. Validación de query params (debe fallar)
  results.push(
    await testEndpoint(
      'Validación (limit inválido)',
      `${API_BASE_URL}/products?limit=999`,
    ),
  );

  // Resumen
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMEN DE PRUEBAS');
  console.log('='.repeat(60));

  const success = results.filter((r) => r.status === '✅').length;
  const failed = results.filter((r) => r.status === '❌').length;

  results.forEach((result) => {
    console.log(`${result.status} ${result.name}: ${result.message}`);
  });

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Exitosas: ${success}`);
  console.log(`❌ Fallidas: ${failed}`);
  console.log(`📊 Total: ${results.length}`);
  console.log('='.repeat(60) + '\n');
}

// Ejecutar si se llama directamente
if (require.main === module) {
  runTests().catch((error) => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  });
}

export { runTests };





